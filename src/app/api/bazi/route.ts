// ============================================================
// MysticSage - Bazi API Route
// 八字排盘 API 入口
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { Gender, BaziInput } from '@/lib/bazi/types';
import { getOrGenerateReading, generateBirthKey, getCacheStats } from '@/lib/db/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { year, month, day, hour, minute, gender } = body;

    // 验证输入
    if (!year || !month || !day || hour === undefined || minute === undefined || !gender) {
      return NextResponse.json(
        { error: 'Missing required fields: year, month, day, hour, minute, gender' },
        { status: 400 }
      );
    }

    const input: BaziInput = {
      year: Number(year),
      month: Number(month),
      day: Number(day),
      hour: Number(hour),
      minute: Number(minute),
      gender: gender as Gender,
      timezoneOffset: 8, // Default to China time
    };

    const key = generateBirthKey(input);

    const result = await getOrGenerateReading(input);

    return NextResponse.json({
      success: true,
      data: result.bazi,
      reading: result.reading,
      cacheKey: key,
      fromCache: result.fromCache,
    });
  } catch (err) {
    console.error('Bazi API error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    name: 'MysticSage Bazi Engine',
    version: '1.0.0',
    cache: getCacheStats(),
  });
}
