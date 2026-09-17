'use client';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';
import {ArrowUpRight,Plus,Check} from 'lucide-react';
import {products} from '@/lib/content';
import {siteConfig as c} from '@/siteConfig';
import {useCart} from './store';

const filters = ['All flowers','Rose Bouquets','Mixed Floral Bouquets','Other Services','Event Arrangements'];

function priceLabel(p: typeof products[number]) {
  if (p.contactOnly) return 'Quote';
  return `$${p.price}${p.priceFrom ? '+' : ''}`;
}

export function ProductCard({product:p}:{product:typeof products[number]}) {
  const {add}=useCart();
  const [added,S]=useState(false);
  const requestOnly = p.contactOnly || !c.hasEcommerce;
  return (
    <article className="product-card">
      <div className="product-image">
        <Image src={p.image} alt={p.description} fill sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 30vw"/>
        <span className="product-tag">{p.tag}</span>
        {requestOnly ? (
          <Link className="add-button" aria-label={`Request ${p.name}`} href={`/contact?arrangement=${p.id}`}>
            <ArrowUpRight size={20}/>
          </Link>
        ) : (
          <button className="add-button" aria-label={`Add ${p.name} to bag`} onClick={()=>{add(p.id);S(true);setTimeout(()=>S(false),1800)}}>
            {added?<Check size={20}/>:<Plus size={20}/>}
          </button>
        )}
      </div>
      <div className="product-title">
        <h3>{p.name}</h3>
        <span>{priceLabel(p)}</span>
      </div>
      <p>{p.category} · Hand-tied with care</p>
      <span className="sr-only" aria-live="polite">{added?`${p.name} added to bag`:''}</span>
    </article>
  );
}

export function Catalog() {
  const [filter,S]=useState('All flowers');
  return (
    <>
      <div className="filter-row" aria-label="Filter arrangements">
        {filters.map(x=>
          <button aria-pressed={filter===x} className={filter===x?'selected':''} onClick={()=>S(x)} key={x}>{x}</button>
        )}
      </div>
      <div className="product-grid">
        {products.filter(p=>filter==='All flowers'||p.category===filter).map(p=>
          <ProductCard product={p} key={p.id}/>
        )}
      </div>
    </>
  );
}
