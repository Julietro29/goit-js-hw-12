import{a as g,i as d,S as L}from"./assets/vendor-b725de7c.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();const b="41921784-0571e350d6104826bc1422cb3",w=document.getElementById("search-form"),m=document.getElementById("search-input"),h=document.getElementById("loader"),u=document.getElementById("gallery"),s=document.querySelector('[data-action="load-more"]');let p,c=1;w.addEventListener("submit",async function(e){e.preventDefault(),c=1;const t=m.value.trim();t!==""&&await y(t)});s.addEventListener("click",E);function E(){c+=1;const e=m.value.trim();e!==""&&y(e,c)}async function y(e,t=1){try{const r=await $(e,t);r.data.hits.length>0?(t===1&&f(),C(r.data.hits),v(),I()):(S(),f()),r.data.totalHits<=t*40&&k()}catch(r){console.error("Error fetching images:",r),l(),T("An error occurred while fetching images. Please try again.")}}function f(){u.innerHTML=""}function v(){p.refresh()}function I(){u.scrollIntoView({behavior:"smooth"})}async function $(e,t){const r=`https://pixabay.com/api/?key=${b}&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=40`;M();try{const a=await g.get(r);return l(),a}catch(a){throw l(),a}}function C(e){const t=document.createDocumentFragment();e.forEach(r=>{const a=x(r);t.appendChild(a)}),u.appendChild(t),e.length>0?s.style.display="block":s.style.display="none"}function M(){h.style.display="block"}function l(){h.style.display="none"}function x(e){const t=document.createElement("div");return t.className="image-card",t.innerHTML=`
    <a href="${e.largeImageURL}" data-lightbox="gallery">
      <img src="${e.webformatURL}" alt="${e.tags}">
    </a>
    <div class="image-details">
      <p>Likes: ${e.likes}</p>
      <p>Views: ${e.views}</p>
      <p>Comments: ${e.comments}</p>
      <p>Downloads: ${e.downloads}</p>
    </div>
  `,t}function S(){d.info({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"})}function T(e){d.error({title:"Error",message:e})}function k(){d.info({title:"End of Collection",message:"We're sorry, but you've reached the end of search results."}),s.style.display="none"}function N(){p=new L(".image-card a")}document.addEventListener("DOMContentLoaded",N);
//# sourceMappingURL=commonHelpers.js.map
