export default function (page: number, perPage: number, total: number, data: Array<Object>) {
  return {
    page: perPage < 0 ? 1 : page,
    perPage: perPage < 0 ? 1 : perPage,
    totalPages: perPage < 0 ? 1 : Math.ceil(total / perPage),
    total,
    data,
  };
}
