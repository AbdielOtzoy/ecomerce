import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cartitem.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async getOrCreateCart(userId?: string, sessionId?: string): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: userId ? { userId } : { sessionId },
      relations: ['items'],
    });

    if (!cart) {
      cart = this.cartRepository.create({
        userId,
        sessionId: !userId ? sessionId : undefined,
        items: [],
      });
      await this.cartRepository.save(cart);
    }

    return cart;
  }

  async addToCart(
    productId: string,
    productName: string,
    quantity: number,
    unitPrice: number,
    imageUrl?: string,
    userId?: string,
    sessionId?: string,
  ): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId, sessionId);
    console.log(`Cart retrieved: ${cart.id}`);
    // Verificar si el producto ya existe en el carrito
    const existingItem = cart.items.find(
      (item) => item.productId === productId,
    );

    console.log(`Existing item found: ${existingItem?.id}`);

    if (existingItem) {
      existingItem.quantity += quantity;
      await this.cartItemRepository.save(existingItem);
    } else {
      console.log(`Creating new cart item for product ${productId}`);
      const newItem = this.cartItemRepository.create({
        productId,
        productName,
        quantity,
        price: unitPrice,
        imageUrl,
        cart: cart,
      });
      await this.cartItemRepository.save(newItem);
    }
    console.log(
      `Adding ${quantity} of product ${productId} to cart with ID ${cart.id} at ${unitPrice} each`,
    );
    return this.getCartWithItems(cart.id);
  }

  async updateQuantity(
    cartItemId: string,
    quantity: number,
  ): Promise<CartItem> {
    const item = await this.cartItemRepository.findOne({
      where: { id: cartItemId },
    });

    if (!item) throw new NotFoundException('Item not found');

    if (quantity <= 0) {
      await this.cartItemRepository.remove(item);
      return item;
    }

    item.quantity = quantity;
    return this.cartItemRepository.save(item);
  }

  async removeFromCart(cartItemId: string): Promise<void> {
    await this.cartItemRepository.delete(cartItemId);
  }

  private async getCartWithItems(cartId: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['items'],
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    console.log(`Cart with ID ${cartId} retrieved with itemsaaaaa:`);
    return cart;
  }
}
