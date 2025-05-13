'use client';

import { useCallback, useState, useEffect } from 'react';

import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';

export default function AccountForm({ user }: { user: User | null }) {}
