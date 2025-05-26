import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { UploadService } from '../upload/upload.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Create a new product with optional image upload' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      let imageUrl = createProductDto.imageUrl;

      // Si se sube un archivo, procesarlo
      if (file) {
        imageUrl = await this.uploadService.uploadImage(file);
      }

      // Crear el producto con la URL de la imagen
      const productData = {
        ...createProductDto,
        imageUrl,
      };

      return await this.productsService.create(productData);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error creating product');
    }
  }

  @Post(':id/upload-image')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Upload image for existing product' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Image uploaded successfully.',
  })
  async uploadProductImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No image file provided');
    }

    try {
      const imageUrl = await this.uploadService.uploadImage(file);

      // Actualizar el producto con la nueva URL de imagen
      await this.productsService.update(+id, {
        imageUrl,
        name: '',
        description: '',
        price: 0,
        stock: 0,
      });

      return {
        message: 'Image uploaded successfully',
        imageUrl,
      };
    } catch (error) {
      throw new BadRequestException('Error uploading image');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'List of all products',
    type: [Product],
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found product',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({
    summary: 'Update a product by ID with optional image upload',
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      const updateData = { ...updateProductDto };

      // Si se sube una nueva imagen
      if (file) {
        // Obtener el producto actual para eliminar la imagen anterior
        const currentProduct = await this.productsService.findOne(+id);
        if (currentProduct?.imageUrl) {
          await this.uploadService.deleteImage(currentProduct.imageUrl);
        }

        // Subir nueva imagen
        const imageUrl = await this.uploadService.uploadImage(file);
        updateData.imageUrl = imageUrl;
      }

      return await this.productsService.update(+id, updateData);
    } catch (error) {
      throw new BadRequestException('Error updating product');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async remove(@Param('id') id: string) {
    try {
      // Obtener el producto para eliminar su imagen
      const product = await this.productsService.findOne(+id);
      if (product?.imageUrl) {
        await this.uploadService.deleteImage(product.imageUrl);
      }

      return await this.productsService.remove(+id);
    } catch (error) {
      throw new BadRequestException('Error deleting product');
    }
  }
}
