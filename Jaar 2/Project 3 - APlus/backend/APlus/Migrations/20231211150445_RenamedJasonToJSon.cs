using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APlus.Migrations
{
    /// <inheritdoc />
    public partial class RenamedJasonToJSon : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "JasonWebToken",
                table: "Tokens",
                newName: "JsonWebToken");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "JsonWebToken",
                table: "Tokens",
                newName: "JasonWebToken");
        }
    }
}
