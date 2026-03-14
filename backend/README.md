# BF6 Stats Backend API

Backend API server for tracking and analyzing Battlefield 6 player statistics.

## Features

- Historical stats tracking
- Automated daily stat collection via cron jobs
- Player comparison
- K/D and win rate trend analysis
- PostgreSQL database for data persistence

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 14+

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up PostgreSQL database:
```bash
# Create database
createdb bf6_stats

# Or using psql
psql -U postgres
CREATE DATABASE bf6_stats;
\q
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Initialize database schema:
```bash
npm run init-db
```

5. Start development server:
```bash
npm run dev
```

## API Endpoints

### Health Check
- `GET /health` - Check server and database status

### Stats Endpoints
- `GET /api/stats/history/:playerId?days=30` - Get player stats history
- `GET /api/stats/trends/kd/:playerId?days=30` - Get K/D trend data
- `GET /api/stats/trends/winrate/:playerId?days=30` - Get win rate trend data
- `POST /api/stats/compare` - Compare multiple players
  ```json
  {
    "playerIds": ["player1_id", "player2_id"]
  }
  ```
- `POST /api/stats/track` - Add player to tracking list
  ```json
  {
    "playerId": "player_id",
    "playerName": "PlayerName",
    "platform": "pc"
  }
  ```
- `GET /api/stats/tracked` - Get all tracked players
- `POST /api/stats/collect` - Manually trigger stats collection

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run init-db` - Initialize database schema

## Cron Jobs

The server automatically runs these scheduled tasks:

- **Daily at 2 AM**: Fetch stats for all tracked players
- **Every 6 hours**: Update stats for all tracked players

## Database Schema

### Tables

- `player_stats_history` - Historical player statistics
- `weapon_stats_history` - Historical weapon statistics
- `tracked_players` - Players to monitor automatically
- `player_comparisons` - Cached player comparisons

## Environment Variables

See `.env.example` for required configuration.
