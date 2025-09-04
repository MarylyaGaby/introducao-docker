import { Test, TestingModule } from "@nestjs/testing";
import { BookService } from "./book.service";
import { PrismaService } from "../prisma/prisma.service";
import { NotFoundException, ConflictException, BadRequestException } from "@nestjs/common";
import { BookCategory } from "@prisma/client";

// Mock do PrismaService
const mockPrisma = {
  book: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe("BookService", () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Teste de criação
  it("deve criar um livro", async () => {
    const dto = {
      title: "Dom Casmurro",
      author: "Machado de Assis",
      publicationDate: new Date("1899-01-01"),
      category: BookCategory.ROMANCE,
    };

    mockPrisma.book.findUnique.mockResolvedValue(null); // não existe ainda
    mockPrisma.book.create.mockResolvedValue({ id: "1", ...dto });

    const result = await service.create(dto as any);

    expect(result).toEqual({ id: "1", ...dto });
    expect(mockPrisma.book.create).toHaveBeenCalledWith({
      data: {
        title: dto.title,
        author: dto.author,
        publicationDate: dto.publicationDate,
        category: dto.category,
      },
    });
  });

  it("deve lançar erro ao tentar criar livro duplicado", async () => {
    const dto = {
      title: "Dom Casmurro",
      author: "Machado de Assis",
      publicationDate: new Date("1899-01-01"),
      category: BookCategory.ROMANCE,
    };

    mockPrisma.book.findUnique.mockResolvedValue(dto); // já existe

    await expect(service.create(dto as any)).rejects.toThrow(ConflictException);
  });

  // Teste de listagem
  it("deve listar todos os livros", async () => {
    const livros = [{ id: "1", title: "Dom Casmurro", author: "Machado", publicationDate: new Date(), category: BookCategory.ROMANCE }];
    mockPrisma.book.findMany.mockResolvedValue(livros);

    expect(await service.findAll()).toEqual(livros);
  });

  // Teste de busca por id
  it("deve retornar um livro por ID", async () => {
    const livro = { id: "1", title: "Dom Casmurro", author: "Machado", publicationDate: new Date(), category: BookCategory.ROMANCE };
    mockPrisma.book.findUnique.mockResolvedValue(livro);

    expect(await service.findById("1")).toEqual(livro);
  });

  it("deve lançar erro se livro não encontrado", async () => {
    mockPrisma.book.findUnique.mockResolvedValue(null);

    await expect(service.findById("999")).rejects.toThrow(NotFoundException);
  });

  // Teste de atualização
  it("deve atualizar um livro", async () => {
    const updated = { id: "1", title: "Dom Casmurro (Revisado)", author: "Machado", publicationDate: new Date(), category: BookCategory.ROMANCE };
    mockPrisma.book.update.mockResolvedValue(updated);

    expect(await service.update("1", { title: "Dom Casmurro (Revisado)" } as any)).toEqual(updated);
  });

  it("deve lançar erro ao atualizar livro inexistente", async () => {
    mockPrisma.book.update.mockRejectedValue(new Error());

    await expect(service.update("999", { title: "Outro" } as any)).rejects.toThrow(BadRequestException);
  });

  // Teste de remoção
  it("deve remover um livro", async () => {
    const removed = { id: "1", title: "Dom Casmurro", author: "Machado", publicationDate: new Date(), category: BookCategory.ROMANCE };
    mockPrisma.book.delete.mockResolvedValue(removed);

    expect(await service.delete("1")).toEqual(removed);
  });

  it("deve lançar erro ao remover livro inexistente", async () => {
    mockPrisma.book.delete.mockRejectedValue(new Error());

    await expect(service.delete("999")).rejects.toThrow(NotFoundException);
  });
});
