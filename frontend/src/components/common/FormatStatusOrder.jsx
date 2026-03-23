
export const formatStatus = (orderStatus) => {
  if (orderStatus === 'PAID')
    return 'PAGADA'
  else if (orderStatus === 'PENDING')
    return 'PENDIENTE'
  else if (orderStatus === 'CANCELLED')
    return 'CANCELADA'
  return ''
}