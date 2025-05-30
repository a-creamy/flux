import '../App.css';

export default function Shop() {
    let visible = false;

    document.addEventListener('keydown', function(event) {
        if (event.key === 's' || event.key === 'S') {
            const element: Element | null = document.querySelector('.shop');


            if (!visible) {
                visible = true;
                if (element !== null) {
                    element.style.display = 'block';
                }

            } else {
                visible = false;
                if (element !== null) {
                    element.style.display = 'none';
                }
            }
        }
    });

    return (
        <div class='shop'></div>
    )
}
