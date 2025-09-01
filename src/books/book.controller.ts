import { Body, Controller, Delete, Get, Param, Post, Put , UseGuards} from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdateBookDto } from "./dto/update-book.dto";
import { AdminGuard } from "../auth/admin.guard";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { ComumGuard } from "../auth/comum.guard";

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags("/books")
@Controller("/books")
export class BookController {
    constructor(private readonly bookService: BookService) { }
    @UseGuards(JwtAuthGuard)

    @UseGuards(AdminGuard)
    @Post()
    @ApiOperation({ summary: 'Criar um novo livro' })
    @ApiResponse({ status: 201, description: 'Livro criado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    create(@Body() data: CreateBookDto) {
        return this.bookService.create(data);
    }

    @UseGuards(ComumGuard)
    @Get()
    @ApiOperation({ summary: 'Listar todos os livros' })
    @ApiResponse({ status: 200, description: 'Lista de livros retornada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Nenhum livro encontrado.' })
    findAll() {
        return this.bookService.findAll();
    }

    @UseGuards(ComumGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Obter um livro por ID' })
    @ApiResponse({ status: 200, description: 'Livro encontrado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Livro não encontrado.' })
    findById(@Param('id') id: string) {
        return this.bookService.findById(id);
    }

    @UseGuards(AdminGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Atualizar um livro por ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID do livro' }) // 👈 aqui
    @ApiResponse({ status: 200, description: 'Livro atualizado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    @ApiResponse({ status: 404, description: 'Livro não encontrado.' })
    update(@Param('id') id: string, @Body() data: UpdateBookDto) {
        return this.bookService.update(id, data);
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Deletar um livro por ID' })
    @ApiResponse({ status: 200, description: 'Livro deletado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Livro não encontrado.' })
    delete(@Param('id') id: string) {
        return this.bookService.delete(id);
    }
}