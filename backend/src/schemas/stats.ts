import { z } from 'zod';

export const playerIdParamSchema = z.object({
  params: z.object({
    playerId: z.string().min(1, 'Player ID is required'),
  }),
});

export const trendQuerySchema = z.object({
  params: z.object({
    playerId: z.string().min(1, 'Player ID is required'),
  }),
  query: z.object({
    days: z.string().optional().transform(val => val ? parseInt(val) : 30),
  }),
});

export const compareSchema = z.object({
  body: z.object({
    playerIds: z.array(z.string()).min(2, 'At least 2 player IDs are required'),
  }),
});

export const trackSchema = z.object({
  body: z.object({
    playerId: z.string().min(1, 'Player ID is required'),
    playerName: z.string().min(1, 'Player name is required'),
    platform: z.enum(['pc', 'psn', 'xbox']).optional().default('pc'),
  }),
});
