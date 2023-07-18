import { SortOrder } from 'mongoose';

type IOptions = {
    limit?: number;
    sortBy?: string;
    sortOrder?: SortOrder;
};

type IOptionResult = {
    limit: number;
    sortBy: string;
    sortOrder: SortOrder;
};

export const isFilterOption = (options: IOptions): IOptionResult => {
    const limit = Number(options.limit || 0);
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';

    return {
        limit,
        sortBy,
        sortOrder,
    };
};

export const filterOptionConstant = ['limit', 'sortBy', 'sortOrder'];
