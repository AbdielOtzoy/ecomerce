import { Injectable, BadRequestException } from '@nestjs/common';
import { CloudinaryConfigService } from '../config/cloudinary.config';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class UploadService {
  constructor(
    private readonly cloudinaryConfigService: CloudinaryConfigService,
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Only image files are allowed');
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException('File size must be less than 5MB');
    }

    try {
      const cloudinary = this.cloudinaryConfigService.getCloudinary();

      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: 'products',
              resource_type: 'auto',
              transformation: [
                { width: 800, height: 600, crop: 'limit' },
                { quality: 'auto' },
                { format: 'auto' },
              ],
            },
            (
              error: UploadApiErrorResponse | undefined,
              result: UploadApiResponse | undefined,
            ) => {
              if (error) {
                reject(error);
              } else if (result) {
                resolve(result);
              } else {
                reject(new Error('Upload failed: No result returned'));
              }
            },
          )
          .end(file.buffer);
      });

      return result.secure_url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw new BadRequestException('Error uploading image to cloud storage');
    }
  }

  async deleteImage(imageUrl: string): Promise<void> {
    try {
      const cloudinary = this.cloudinaryConfigService.getCloudinary();

      // Extraer public_id de la URL de Cloudinary
      const publicId = this.extractPublicIdFromUrl(imageUrl);
      if (publicId) {
        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result !== 'ok' && result.result !== 'not found') {
          console.warn(
            `Failed to delete image with public_id: ${publicId}`,
            result,
          );
        }
      }
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
      // No lanzamos excepción para evitar fallos en cascada
    }
  }

  /**
   * Elimina múltiples imágenes de Cloudinary
   * @param imageUrls Array de URLs de imágenes a eliminar
   */
  async deleteImages(imageUrls: string[]): Promise<void> {
    const deletePromises = imageUrls.map((url) => this.deleteImage(url));
    await Promise.allSettled(deletePromises);
  }

  /**
   * Obtiene información detallada de una imagen desde Cloudinary
   * @param imageUrl URL de la imagen
   * @returns Información de la imagen o null si no se encuentra
   */
  async getImageInfo(imageUrl: string): Promise<any | null> {
    try {
      const cloudinary = this.cloudinaryConfigService.getCloudinary();
      const publicId = this.extractPublicIdFromUrl(imageUrl);

      if (!publicId) {
        return null;
      }

      const result = await cloudinary.api.resource(publicId);
      return result;
    } catch (error) {
      console.error('Error getting image info from Cloudinary:', error);
      return null;
    }
  }

  /**
   * Transforma una imagen existente en Cloudinary
   * @param imageUrl URL de la imagen original
   * @param transformations Transformaciones a aplicar
   * @returns URL de la imagen transformada
   */
  generateTransformedUrl(
    imageUrl: string,
    transformations: Array<Record<string, any>>,
  ): string {
    const cloudinary = this.cloudinaryConfigService.getCloudinary();
    const publicId = this.extractPublicIdFromUrl(imageUrl);

    if (!publicId) {
      throw new BadRequestException('Invalid image URL');
    }

    return cloudinary.url(publicId, {
      transformation: transformations,
      secure: true,
    });
  }

  private extractPublicIdFromUrl(url: string): string | null {
    try {
      // Patrón más robusto para extraer el public_id
      const regex = /\/(?:v\d+\/)?([^/.]+\/[^/.]+)(?:\.[^.]+)?$/;
      const match = url.match(regex);

      if (match && match[1]) {
        return match[1];
      }

      // Fallback para el patrón específico de products
      const productsRegex = /\/products\/([^/.]+)/;
      const productsMatch = url.match(productsRegex);
      return productsMatch ? `products/${productsMatch[1]}` : null;
    } catch (error) {
      console.error('Error extracting public_id from URL:', error);
      return null;
    }
  }

  /**
   * Valida si una URL pertenece a Cloudinary
   * @param url URL a validar
   * @returns true si es una URL de Cloudinary válida
   */
  isCloudinaryUrl(url: string): boolean {
    const cloudinaryPattern = /^https?:\/\/res\.cloudinary\.com\/.+/;
    return cloudinaryPattern.test(url);
  }

  /**
   * Obtiene las transformaciones predefinidas para diferentes tamaños
   */
  getPresetTransformations() {
    return {
      thumbnail: [
        { width: 150, height: 150, crop: 'thumb', gravity: 'face' },
        { quality: 'auto' },
        { format: 'auto' },
      ],
      small: [
        { width: 300, height: 300, crop: 'limit' },
        { quality: 'auto' },
        { format: 'auto' },
      ],
      medium: [
        { width: 600, height: 600, crop: 'limit' },
        { quality: 'auto' },
        { format: 'auto' },
      ],
      large: [
        { width: 1200, height: 1200, crop: 'limit' },
        { quality: 'auto' },
        { format: 'auto' },
      ],
    };
  }
}
