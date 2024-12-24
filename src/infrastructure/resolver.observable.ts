import {
    firstValueFrom,
    lastValueFrom,
    Observable,
    OperatorFunction,
} from 'rxjs';

type ResolveObservableOptions<T, R, D extends T | R> = {
    useLastValue?: boolean;
    defaultValue?: D;
    pipeline?: OperatorFunction<T, R>;
};

export function resolveObservable<T, R = T, D extends T | R = R>(
    observable: Observable<T>,
    options?: ResolveObservableOptions<T, R, D>,
): Promise<R | D> | Promise<T | D> {
    const defaultValue = options?.defaultValue;
    const pipeline = options?.pipeline;

    const fn = options?.useLastValue ? lastValueFrom : firstValueFrom;

    if (pipeline) {
        return typeof defaultValue === 'undefined'
            ? fn(pipeline(observable))
            : fn(pipeline(observable), { defaultValue });
    }

    return typeof defaultValue === 'undefined'
        ? fn(observable)
        : fn(observable, { defaultValue });
}
