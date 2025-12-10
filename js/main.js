// Active navigation highlighting
document.addEventListener('DOMContentLoaded', function() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop();

    // Highlight active nav link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add copy button to code blocks
document.addEventListener('DOMContentLoaded', function() {
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach((block, index) => {
        const pre = block.parentElement;
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';

        const button = document.createElement('button');
        button.textContent = 'Copy';
        button.style.position = 'absolute';
        button.style.top = '10px';
        button.style.right = '10px';
        button.style.padding = '5px 10px';
        button.style.backgroundColor = '#3498db';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '3px';
        button.style.cursor = 'pointer';
        button.style.fontSize = '0.8em';

        button.addEventListener('click', function() {
            const code = block.textContent;
            navigator.clipboard.writeText(code).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            });
        });

        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        wrapper.appendChild(button);
    });
});

// Table of contents generator (optional)
function generateTableOfContents() {
    const headings = document.querySelectorAll('h2, h3');
    const toc = document.querySelector('#toc');

    if (!toc || headings.length === 0) return;

    const tocList = document.createElement('ul');
    tocList.style.listStyle = 'none';
    tocList.style.paddingLeft = '0';

    headings.forEach((heading, index) => {
        const id = `section-${index}`;
        heading.id = id;

        const li = document.createElement('li');
        li.style.marginBottom = '0.5rem';
        if (heading.tagName === 'H3') {
            li.style.paddingLeft = '1rem';
        }

        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = heading.textContent;
        a.style.color = '#3498db';

        li.appendChild(a);
        tocList.appendChild(li);
    });

    toc.appendChild(tocList);
}

// Call TOC generator on load
document.addEventListener('DOMContentLoaded', generateTableOfContents);
