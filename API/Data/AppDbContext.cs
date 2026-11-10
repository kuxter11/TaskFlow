using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<TeamMember> TeamMembers { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectMember> ProjectMembers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Team - TeamMember (one-to-many)
            modelBuilder.Entity<TeamMember>().HasKey(tm => new { tm.TeamId, tm.UserId });

            modelBuilder
                .Entity<User>()
                .HasIndex(u => u.RefreshToken)
                .IsUnique()
                .HasFilter("[RefreshToken] IS NOT NULL");

            modelBuilder
                .Entity<TeamMember>()
                .HasOne(tm => tm.Team)
                .WithMany(t => t.Members)
                .HasForeignKey(tm => tm.TeamId);

            // User - TeamMember (one-to-many)
            modelBuilder
                .Entity<TeamMember>()
                .HasOne(tm => tm.User)
                .WithMany(u => u.Teams)
                .HasForeignKey(tm => tm.UserId);

            modelBuilder
                .Entity<Team>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(t => t.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict);

            // Project - Creator (User)
            modelBuilder
                .Entity<Project>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(p => p.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict);

            // ProjectMember composite primary key
            modelBuilder.Entity<ProjectMember>().HasKey(pm => new { pm.ProjectId, pm.UserId });

            // ProjectMember - Project
            modelBuilder
                .Entity<ProjectMember>()
                .HasOne(pm => pm.Project)
                .WithMany(p => p.Members)
                .HasForeignKey(pm => pm.ProjectId);

            // ProjectMember - User
            modelBuilder
                .Entity<ProjectMember>()
                .HasOne(pm => pm.User)
                .WithMany(u => u.ProjectMemberships)
                .HasForeignKey(pm => pm.UserId);
        }
    }
}
