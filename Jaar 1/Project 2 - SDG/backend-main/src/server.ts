// Node.js and Express-related imports
import express, { Request, Response, Router } from 'express';
import { URL } from 'url';
import cookieParser from 'cookie-parser';

// Database-related imports
import { Database } from './util/database';

// Model imports
import { User } from './data/models/users';
import { Sessions } from './data/models/sessions';
import { Post } from './data/models/posts';

// Repository imports
// Sequelize repositories
import { UserRepository } from './data/repository-sequelize/users';
import { PostRepository } from './data/repository-sequelize/posts';
import { SessionRepository } from './data/repository-sequelize/sessions';
// SQL repositories
import { SQLUserRepository } from './data/repository-sql/users';
import { SQLPostRepository } from './data/repository-sql/posts';
import { SQLSessionRepository } from './data/repository-sql/sessions';
// Repository interfaces
import { UserRepositoryInterface } from './data/models/user-interface';
import { PostRepositoryInterface } from './data/models/post-interface';
import { SessionRepositoryInterface } from './data/models/session-interface';

// Service imports
import { UserService } from './services/users';
import { PostService } from './services/posts';
import { SessionService } from './services/sessions';

// Controller imports
import { UserController } from './controller/users';
import { PostController } from './controller/posts';
import { SessionController } from './controller/sessions';

// Routing-related imports
import { RouteHandler } from './routing/helpers/route-handler';

/**
 * @author Madelief van Slooten
 * Server class - changes server configuration, depending on the .env type
 */
export class Server {
    //server
    private static _instance: Server | null = null;
    private app: express.Express;
    private router: Router;

    //users
    private userService: UserService;
    private userRepository: UserRepositoryInterface;

    //posts
    private postService: PostService;
    private postRepository: PostRepositoryInterface;

    //sessions
    private sessionService: SessionService;
    private sessionRepository: SessionRepositoryInterface;
    private port = 3000;

    //database
    public database: Database;

    //controllers
    public userController: UserController;
    public postController: PostController;
    public sessionController: SessionController;

    public static get instance(): Server {
        if (!this._instance) {
            this._instance = new Server();
        }
        return this._instance;
    }

    /**
     * @author Madelief van Slooten
     * This constructor checks the .env file for which database connection it should start.
     * It then initiates the right classes depending on the database type.
     */
    private constructor() {
        this.database = new Database(process.env.DB_TYPE!);
        this.app = express();

        if (process.env.DB_TYPE === 'sql') {
            this.userRepository = new SQLUserRepository(this.database);
            this.postRepository = new SQLPostRepository(this.database);
            this.sessionRepository = new SQLSessionRepository(this.database);
        } else if (process.env.DB_TYPE === 'sequelize') {
            this.userRepository = new UserRepository();
            this.postRepository = new PostRepository();
            this.sessionRepository = new SessionRepository();
        } else {
            throw new Error('Wrong database configuration');
        }
        this.sessionService = new SessionService(this.sessionRepository);
        this.sessionController = new SessionController(this.sessionService);

        this.userService = new UserService(this.userRepository, this.sessionService);
        this.userController = new UserController(this.userService);

        this.postService = new PostService(this.postRepository);
        this.postController = new PostController(this.postService);

        this.router = Router();
        this.setRoutes();
        this.configuration();
    }

    /**
     * @author Madelief van Slooten
     * Uses the route handler to set the router for the app.
     */
    private setRoutes(): void {
        this.router.use(
            RouteHandler.handleRoutes({
                postController: this.postController,
                sessionController: this.sessionController,
                userController: this.userController,
            })
        );
    }

    /**
     * @author Madelief van Slooten
     * Server configuration
     */
    private configuration(): void {
        this.setHeaders();
        this.parseOptions();
        this.app.use(this.router);
    }

    /**
     * @author Madelief van Slooten
     * Server headers
     */
    private setHeaders(): void {
        this.app.use(function (_request: Request, response: Response, next) {
            const url = new URL('http://localhost:4200');
            response.setHeader('Access-Control-Allow-Origin', url.origin);
            response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            response.setHeader('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }

    /**
     * @author Madelief van Slooten
     * Parsing options
     */
    private parseOptions(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    /**
     * @author Madelief van Slooten
     * Server configuration to start a sequelize server. This loads the correct models for sequelize.
     */
    public sequelizeConfig(): void {
        this.database.sequelize!.addModels([User, Sessions, Post]);

        try {
            this.database
                .sequelize! // { force: true }
                .sync()
                .then((_result: any) => {
                    this.app.listen(this.port, (): void => {
                        console.log(`Connected successfully on port ${this.port} using Sequelize`);
                    });
                });
        } catch (err) {
            throw new Error('Sequelize server not started.');
        }
    }
    /**
     * @author Madelief van Slooten
     * Server configuration to start a simple server that uses a mysql database configuration.
     */
    public sqlConfig(): void {
        try {
            this.app.listen(this.port, (): void =>
                console.log(`Connected successfully on port ${this.port} using MySQL`)
            );
        } catch (err) {
            throw new Error('SQL server not started.');
        }
    }
}

/**
 * @author Madelief van Slooten
 * Main function to initialize the Server class and makes sure the right server gets started, depending  on the .env DB_TYPE.
 */
function main(): void {
    const server = Server.instance;
    process.env.DB_TYPE === 'sql' ? server.sqlConfig() : server.sequelizeConfig();
}

main();
