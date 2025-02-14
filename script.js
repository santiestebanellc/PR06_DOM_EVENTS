document.getElementById("changeColor").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => document.body.style.backgroundColor = "red"
        });
    });
});

document.getElementById("changeLinks").addEventListener("click", () => {
    const color = document.getElementById("linkColor").value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: (color) => {
                document.querySelectorAll("a").forEach(link => {
                    link.style.color = color;
                });
            },
            args: [color]
        });
    });
});

document.getElementById("removeImages").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => {
                document.querySelectorAll("img").forEach(img => img.remove());
            }
        });
    });
});

document.getElementById("togglePasswords").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => {
                document.querySelectorAll("input[type='password'], input[is_pass]").forEach(input => {
                    if (input.hasAttribute("is_pass") && input.getAttribute("is_pass") === "true") {
                        input.type = "password";
                        input.setAttribute("is_pass", "false");
                    } else {
                        input.type = "text";
                        input.setAttribute("is_pass", "true");
                    }
                });
            }
        });
    });
});


chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => {
            const menu = document.createElement("div");
            menu.style.position = "fixed";
            menu.style.top = "50%";
            menu.style.right = "0";
            menu.style.transform = "translateY(-50%)";
            menu.style.background = "#333";
            menu.style.padding = "10px";
            menu.style.borderRadius = "8px 0 0 8px";
            menu.style.boxShadow = "-4px 0 8px rgba(0, 0, 0, 0.2)";
            menu.style.display = "flex";
            menu.style.flexDirection = "column";
            menu.style.gap = "10px";
            menu.style.zIndex = "10000";

            const createButton = (text) => {
                const button = document.createElement("button");
                button.innerText = text;
                button.style.background = "#007bff";
                button.style.color = "white";
                button.style.border = "none";
                button.style.padding = "10px 15px";
                button.style.cursor = "pointer";
                button.style.borderRadius = "5px";
                button.style.fontSize = "14px";
                button.style.transition = "background 0.3s, transform 0.2s";
                button.onmouseover = () => button.style.background = "#0056b3";
                button.onmouseleave = () => button.style.background = "#007bff";
                button.onmousedown = () => button.style.transform = "scale(0.95)";
                button.onmouseup = () => button.style.transform = "scale(1)";
                return button;
            };

            const button1 = createButton("Informacion Imagenes");
            button1.onclick = () => {
                document.querySelectorAll("img").forEach(img => {
                    const tooltip = document.createElement("div");
                    tooltip.innerText = img.alt || "Sin descripción";
                    tooltip.style.position = "absolute";
                    tooltip.style.background = "rgba(0, 0, 0, 0.75)";
                    tooltip.style.color = "white";
                    tooltip.style.padding = "5px";
                    tooltip.style.borderRadius = "5px";
                    tooltip.style.fontSize = "12px";
                    tooltip.style.visibility = "hidden";
                    tooltip.style.pointerEvents = "none";
                    tooltip.style.zIndex = "10000";
                    document.body.appendChild(tooltip);

                    img.addEventListener("mouseenter", (event) => {
                        tooltip.style.left = `${event.pageX + 10}px`;
                        tooltip.style.top = `${event.pageY + 10}px`;
                        tooltip.style.visibility = "visible";
                    });

                    img.addEventListener("mouseleave", () => {
                        tooltip.style.visibility = "hidden";
                    });
                });
            };

            const button2 = createButton("Precio Mas Bajo");
            button2.onclick = () => {
                const products = document.querySelectorAll(".p13n-sc-uncoverable-faceout, .s-result-item");
                let lowestPriceElement = null;
                let lowestPrice = Infinity;

                products.forEach(product => {
                    const priceElement = product.querySelector(".a-price-whole");
                    if (priceElement) {
                        const priceText = priceElement.innerText.replace(/[^0-9]/g, "");
                        const price = parseFloat(priceText);
                        if (!isNaN(price) && price < lowestPrice) {
                            lowestPrice = price;
                            lowestPriceElement = product;
                        }
                    }
                });

                if (lowestPriceElement) {
                    lowestPriceElement.style.border = "3px solid red";
                    lowestPriceElement.style.backgroundColor = "#fffae6";

                    const priceTag = lowestPriceElement.querySelector(".a-price-whole");
                    if (priceTag) {
                        priceTag.style.backgroundColor = "yellow";
                        priceTag.style.fontWeight = "bold";
                        priceTag.style.padding = "3px";
                    }

                    lowestPriceElement.scrollIntoView({ behavior: "smooth", block: "center" });
                } else {
                    console.log("No se encontró un precio válido en toda la web.");
                }
            };

            menu.appendChild(button1);
            menu.appendChild(button2);
            document.body.appendChild(menu);
        }
    });
});








