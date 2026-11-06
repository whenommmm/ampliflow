export type FunnelCounts = { leads: number; sent: number; accepted: number; messaged: number; replied: number }
export type FunnelRates = { sentOfLeads: number; acceptRate: number; replyRate: number; overall: number }

const pct = (part: number, whole: number) => (whole > 0 ? Math.round((part / whole) * 100) : 0)

export function funnelRates(c: FunnelCounts): FunnelRates {
  return {
    sentOfLeads: pct(c.sent, c.leads),
    acceptRate: pct(c.accepted, c.sent),
    replyRate: pct(c.replied, c.messaged),
    overall: pct(c.replied, c.leads),
  }
}
