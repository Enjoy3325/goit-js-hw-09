const t=document.querySelector("button[data-start]");console.log(t);const e=document.querySelector("button[data-stop]"),o=document.body;let n=null;t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,n=setInterval((()=>{o.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),e.addEventListener("click",(function(){e.disabled=!0,t.disabled=!1,clearInterval(n)}));
//# sourceMappingURL=01-color-switcher.f4199619.js.map
