import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-car.dto';
import { UpdateQuantityDto } from './entities/update-quantity.dto';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(
    @Body() addToCartDto: AddToCartDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user?.id != null ? String(req.user.id) : undefined; // Si está autenticado
    const authorization = req.headers.authorization;
    const sessionId = authorization?.split(' ')[1];

    return this.cartService.addToCart(
      addToCartDto.productId,
      addToCartDto.productName,
      addToCartDto.quantity,
      addToCartDto.unitPrice,
      addToCartDto.imageUrl,
      userId,
      sessionId,
    );
  }

  @Get()
  async getCart(@Req() req: RequestWithUser) {
    const userId = req.user?.id != null ? String(req.user.id) : undefined;
    const sessionId = req.headers.authorization?.split(' ')[1];

    return this.cartService.getOrCreateCart(userId, sessionId);
  }

  @Patch('items/:id')
  async updateQuantity(
    @Param('id') itemId: string,
    @Body() updateDto: UpdateQuantityDto,
  ) {
    return this.cartService.updateQuantity(itemId, updateDto.quantity);
  }

  @Delete('items/:id')
  async removeItem(@Param('id') itemId: string) {
    return this.cartService.removeFromCart(itemId);
  }

  @Post('clear/:cartId')
  async clearCart(@Param('cartId') cartId: string) {
    return this.cartService.clearCart(cartId);
  }
}
