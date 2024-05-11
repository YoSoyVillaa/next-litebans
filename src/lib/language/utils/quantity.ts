const quantity = (key: any, value: number) => {
  return value === 1 ? key.singular : key.plural;
}	

export default quantity;