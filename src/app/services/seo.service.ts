import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  type?: string; // og:type
  url?: string;
  image?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(private meta: Meta, private title: Title, @Inject(DOCUMENT) private doc: Document) {}

  update(config: SeoConfig) {
    if (config.title) {
      this.title.setTitle(config.title + ' | Carlos Arroyo');
      this.setTag('og:title', config.title);
      this.setTag('twitter:title', config.title);
    }
    if (config.description) {
      this.setTag('description', config.description, true);
      this.setTag('og:description', config.description);
      this.setTag('twitter:description', config.description);
    }
    if (config.keywords) {
      this.setTag('keywords', config.keywords.join(', '), true);
    }
    if (config.type) this.setTag('og:type', config.type);
    if (config.url) { this.setTag('og:url', config.url); }
    if (config.image) { this.setTag('og:image', config.image); this.setTag('twitter:image', config.image); }

    if (config.jsonLd) {
      this.injectJsonLd(config.jsonLd);
    }
  }

  private setTag(name: string, content: string, overwrite = false) {
    if (overwrite) {
      const exists = this.meta.getTag(`name='${name}'`) || this.meta.getTag(`property='${name}'`);
      if (exists) this.meta.removeTagElement(exists);
    }
    this.meta.addTag({ name, content }, overwrite ? true : undefined);
  }

  private injectJsonLd(data: Record<string, any> | Record<string, any>[]) {
    // Remove previous if exists
    const existing = this.doc.head.querySelectorAll('script[data-jsonld="dynamic"]');
    existing.forEach(e => e.remove());

    const block = Array.isArray(data) ? data : [data];
    block.forEach(obj => {
      const script = this.doc.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-jsonld', 'dynamic');
      script.text = JSON.stringify(obj);
      this.doc.head.appendChild(script);
    });
  }
}
