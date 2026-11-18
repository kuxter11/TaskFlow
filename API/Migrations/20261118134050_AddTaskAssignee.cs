using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddTaskAssignee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AssigneeId",
                table: "ProjectTasks",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTasks_AssigneeId",
                table: "ProjectTasks",
                column: "AssigneeId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTasks_Users_AssigneeId",
                table: "ProjectTasks",
                column: "AssigneeId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectTasks_Users_AssigneeId",
                table: "ProjectTasks");

            migrationBuilder.DropIndex(
                name: "IX_ProjectTasks_AssigneeId",
                table: "ProjectTasks");

            migrationBuilder.DropColumn(
                name: "AssigneeId",
                table: "ProjectTasks");
        }
    }
}
