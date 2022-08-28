interface IRepository<T> {
  getById(id: string): Promise<T | undefined>;
  create(data: Partial<T>): Promise<boolean | undefined>;
  update(data: Partial<T>): Promise<boolean | undefined>;
  delete(id: string): Promise<boolean | undefined>;
}

export default IRepository;
