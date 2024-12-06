import{u,f as h,r as f,i as g,a as m,x as l,t as v}from"./Header-DVaD9LBz.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const w={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:h},y=(t=w,e,a)=>{const{kind:o,metadata:r}=a;let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),n.set(a.name,t),o==="accessor"){const{name:s}=a;return{set(i){const p=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,p,t)},init(i){return i!==void 0&&this.P(s,void 0,t),i}}}if(o==="setter"){const{name:s}=a;return function(i){const p=this[s];e.call(this,i),this.requestUpdate(s,p,t)}}throw Error("Unsupported decorator location: "+o)};function b(t){return(e,a)=>typeof a=="object"?y(t,e,a):((o,r,n)=>{const s=r.hasOwnProperty(n);return r.constructor.createProperty(n,s?{...o,wrapped:!0}:o),s?Object.getOwnPropertyDescriptor(r,n):void 0})(t,e,a)}function P(t,e="photo"){return`http://127.0.0.1:8090/api/files/${t.collectionId}/${t.id}/${t[e]}`}var $=Object.defineProperty,x=Object.getOwnPropertyDescriptor,d=(t,e,a,o)=>{for(var r=o>1?void 0:o?x(e,a):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&$(e,a,r),r};let c=class extends m{constructor(){super(...arguments),this.data={items:[],page:0,perPage:0,totalItems:0,totalPages:0}}connectedCallback(){super.connectedCallback(),this.fetchData()}async fetchData(){const e=await(await fetch("http://127.0.0.1:8090/api/collections/products/records")).json();this.data=e}updated(t){super.updated(t),this.renderRoot.querySelectorAll(".product-item")}render(){return l`
      <div class="container">
        <ul>
        ${this.data.items.map(t=>l`
          <li class="product-item">
            <a href="/">
              <figure>
                <img src="${P(t)}" alt="" />
              </figure>
              <span class="brand">${t.brand}</span>
              <span class="description">${t.description}</span>
              <span class="price">${t.price.toLocaleString()}원</span>
              <div>
                <span class="discount">${t.discount}%</span>
                <span class="real-price">${(t.price-t.price*t.discount*.01).toLocaleString()}원</span>
              </div>
            </a>
          </li>
          `)}
        </ul>
      </div>
    `}};c.styles=[f,g`
      .container {
        margin: 0 auto;

        & img {
          width: 100%;
        }

        & ul {
          display: grid;
          place-items: center;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 2rem;
          margin: 2.5rem;

          & li {
            & a {
              max-width: 30vw;
              display: flex;
              flex-direction: column;
              gap: 0.6rem;
            }
          }

          .description {
            font-size: 0.8rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .price {
            color: gray;
            text-decoration: line-through;
          }

          .discount {
            font-size: 1.2rem;
            color: red;
          }

          .real-price {
            font-weight: bold;
          }
        }
      }
    `];d([b({type:Object})],c.prototype,"data",2);c=d([v("product-list")],c);
