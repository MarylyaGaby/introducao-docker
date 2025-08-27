import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    registerUser: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('deve registrar um usuário e retornar o resultado do service', async () => {
      const dto: RegisterUserDto = {
        email: 'teste@email.com',
        password: '123456',
        name: 'Teste',
      };

      const expectedResult = { id: 1, ...dto };
      mockAuthService.registerUser.mockResolvedValue(expectedResult);

      const result = await controller.RegisterUser(dto);

      expect(service.registerUser).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('login', () => {
    it('deve logar o usuário e retornar um token', async () => {
      const credentials: LoginDto = {
        email: 'teste@email.com',
        password: '123456',
      };

      const expectedResponse: LoginResponseDto = {
        access_token: 'jwt-token',
      };

      mockAuthService.login.mockResolvedValue(expectedResponse);

      const result = await controller.login(credentials);

      expect(service.login).toHaveBeenCalledWith(credentials);
      expect(result).toEqual(expectedResponse);
    });
  });
});
