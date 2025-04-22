import { NextRequest, NextResponse } from 'next/server';
import { Lead } from '@/domain/entities/lead';
import { SalesforceLeadRepository } from '@/infrastructure/repositories/salesforce-lead-repository';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const lead = body as Lead;

    const repository = new SalesforceLeadRepository();
    await repository.createLead(lead);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: error.message ?? 'Internal Server Error' },
      { status: 500 }
    );
  }
}
