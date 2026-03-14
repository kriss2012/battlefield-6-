# Database Setup Guide

## PostgreSQL Installation & Setup

The BF6 Stats application requires PostgreSQL to store user data, player statistics, and leaderboard information.

## Option 1: Docker (Recommended for Development)

### Install Docker Desktop
1. Download Docker Desktop for Windows from https://www.docker.com/products/docker-desktop
2. Install and restart your computer if prompted
3. Start Docker Desktop

### Run PostgreSQL Container
```bash
# Start PostgreSQL container
docker run --name bf6-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=bf6_stats \
  -p 5432:5432 \
  -d postgres:15

# Verify it's running
docker ps
```

### Stop/Start Container
```bash
# Stop
docker stop bf6-postgres

# Start again
docker start bf6-postgres

# Remove (warning: deletes all data)
docker rm -f bf6-postgres
```

## Option 2: Native PostgreSQL Installation

### Windows Installation
1. Download PostgreSQL 15+ from https://www.postgresql.org/download/windows/
2. Run the installer
3. Set password to `postgres` during installation
4. Ensure port 5432 is selected
5. Complete the installation

### Create Database
```bash
# Open psql (PostgreSQL command line)
psql -U postgres

# Create database
CREATE DATABASE bf6_stats;

# Exit
\q
```

## Initialize Database Schema

Once PostgreSQL is running:

```bash
cd bf6-stats-app/backend
npm run init-db
```

This will create all necessary tables:
- `users` - User accounts with authentication
- `player_stats_history` - Historical player statistics
- `tracked_players` - Players being monitored
- `leaderboard` - Global rankings
- `friendships` - Friend relationships
- `squads` - Squad/clan information
- `squad_members` - Squad membership
- `squad_leaderboard` - Squad rankings

## Verify Connection

Test the database connection:

```bash
# Health check endpoint
curl http://localhost:5000/health

# Should return:
# {"status":"ok","database":"connected"}
```

## Environment Variables

The backend uses these database settings from `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bf6_stats
DB_USER=postgres
DB_PASSWORD=postgres
```

## Troubleshooting

### Connection Failed
- Ensure PostgreSQL is running: `docker ps` or check Services (Windows)
- Verify port 5432 is not blocked by firewall
- Check credentials match `.env` file

### Init DB Fails
- Make sure backend dependencies are installed: `npm install`
- Verify PostgreSQL user has permission to create tables
- Check backend logs for specific errors

### Permission Denied
```bash
# Grant permissions (if needed)
psql -U postgres -d bf6_stats
GRANT ALL PRIVILEGES ON DATABASE bf6_stats TO postgres;
```

## Next Steps

After database setup:
1. Restart the backend server: `npm run dev`
2. Register a new user: Visit http://localhost:5173/register
3. Test authentication: Login and access your profile
4. Track players and view leaderboards
