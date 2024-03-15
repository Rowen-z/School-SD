using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APlus.Migrations
{
    /// <inheritdoc />
    public partial class UniqueSessionFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Sessions_UserNumber",
                table: "Sessions");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_UserNumber",
                table: "Sessions",
                column: "UserNumber",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Sessions_UserNumber",
                table: "Sessions");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_UserNumber",
                table: "Sessions",
                column: "UserNumber");
        }
    }
}
