import { Prisma } from '../../generated/client';
import prismaClient from "../client";

//extension for filtering soft deleted rows from queries
const filterSoftDeleted = prismaClient.$extends({
  name: 'filterSoftDeleted',
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        if (
          operation === 'findUnique' ||
          operation === 'findFirst' ||
          operation === 'findMany'
        ) {
          args.where = { ...args.where, deletedAt: null };
          return query(args);
        }
        return query(args);
      },
    },
  },
});

const prismaSoftDelete = filterSoftDeleted.$extends({
  name: 'prismaSoftDelete',
  model: {
    $allModels: {
      async delete<M, A>(
        this: M,
        where: Prisma.Args<M, 'delete'>,
      ): Promise<Prisma.Result<M, A, 'update'>> {
        const context = Prisma.getExtensionContext(this)

        return (context as any).update({
          ...where,
          data: {
            deletedAt: new Date(),
          },
        })
      },
    },
  },
});

export default prismaSoftDelete;