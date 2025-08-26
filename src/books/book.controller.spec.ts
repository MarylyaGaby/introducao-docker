import { Test, TestingModule } from "@nestjs/testing";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { BookCategory } from "@prisma/client";
import { NotFoundException } from "@nestjs/common";

const mockBookService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe("BookController", () => {
  let controller: BookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [{ provide: BookService, useValue: mockBookService }],
    }).compile();

    controller = module.get<BookController>(BookController);
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

    const created = { id: "1", ...dto };
    mockBookService.create.mockResolvedValue(created);

    const result = await controller.create(dto as any);

    expect(result).toEqual(created);
    expect(mockBookService.create).toHaveBeenCalledWith(dto);
  });

  // Teste de listagem
  it("deve listar todos os livros", async () => {
    const livros = [{ id: "1", title: "Teste", author: "Autor", publicationDate: new Date(), category: BookCategory.ROMANCE }];
    mockBookService.findAll.mockResolvedValue(livros);

    expect(await controller.findAll()).toEqual(livros);
    expect(mockBookService.findAll).toHaveBeenCalled();
  });

  // Teste de busca por id
  it("deve retornar um livro por ID", async () => {
    const livro = { id: "1", title: "Teste", author: "Autor", publicationDate: new Date(), category: BookCategory.ROMANCE };
    mockBookService.findById.mockResolvedValue(livro);

    expect(await controller.findById("1")).toEqual(livro);
    expect(mockBookService.findById).toHaveBeenCalledWith("1");
  });

  it("deve lançar erro se livro não encontrado", async () => {
    mockBookService.findById.mockRejectedValue(new NotFoundException());

    await expect(controller.findById("999")).rejects.toThrow(NotFoundException);
  });

  // Teste de atualização
  it("deve atualizar um livro", async () => {
    const dto = { title: "Atualizado" };
    const updated = { id: "1", ...dto };

    mockBookService.update.mockResolvedValue(updated);

    expect(await controller.update("1", dto as any)).toEqual(updated);
    expect(mockBookService.update).toHaveBeenCalledWith("1", dto);
  });

  it("deve lançar erro ao atualizar livro inexistente", async () => {
    mockBookService.update.mockRejectedValue(new NotFoundException());

    await expect(controller.update("999", { title: "Outro" } as any)).rejects.toThrow(NotFoundException);
  });

  // Teste de remoção
  it("deve remover um livro", async () => {
    const removed = { id: "1", title: "Removido", author: "Autor", publicationDate: new Date(), category: BookCategory.ROMANCE };

    mockBookService.delete.mockResolvedValue(removed);

    expect(await controller.delete("1")).toEqual(removed);
    expect(mockBookService.delete).toHaveBeenCalledWith("1");
  });

  it("deve lançar erro ao remover livro inexistente", async () => {
    mockBookService.delete.mockRejectedValue(new NotFoundException());

    await expect(controller.delete("999")).rejects.toThrow(NotFoundException);
  });
});
