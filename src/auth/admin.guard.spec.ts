import { ExecutionContext } from '@nestjs/common';
import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let mockContext: Partial<ExecutionContext>;

  beforeEach(() => {
    guard = new AdminGuard();
  });

  function createMockContext(user: any): Partial<ExecutionContext> {
    return {
      switchToHttp: () => ({
        getRequest: () => ({ user }),
      }),
    } as Partial<ExecutionContext>;
  }

  it('deve permitir acesso quando o usuário é ADMIN', () => {
    mockContext = createMockContext({ role: 'ADMIN' });

    const result = guard.canActivate(mockContext as ExecutionContext);

    expect(result).toBe(true);
  });

  it('deve negar acesso quando o usuário não é ADMIN', () => {
    mockContext = createMockContext({ role: 'USER' });

    const result = guard.canActivate(mockContext as ExecutionContext);

    expect(result).toBe(false);
  });

  it('deve negar acesso quando não existe usuário no request', () => {
    mockContext = createMockContext(undefined);

    const result = guard.canActivate(mockContext as ExecutionContext);

    expect(result).toBe(false);
  });
});
