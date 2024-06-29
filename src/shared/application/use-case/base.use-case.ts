export interface BaseUseCase<T, R> {
  execute(params: T): Promise<R>;
}
