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
        <div class='shop'>
            <div style={{
                "z-index": 10,
                position: 'absolute',
                top: '5vh',
                left: '50%',
                transform: 'translateX(-50%)',
                "font-size": '4rem',
                padding: '10px',
                border: '3px solid black',
            }}>Shop</div>
            <div style={{
                "z-index": 10,
                position: 'absolute',
                right: '5vw',
                top: '50%',
                transform: 'translateY(-50%)',
                height: '90vh',
                width: '30vw',
                border: '2px solid black',
            }}></div>
        </div>
    )
}
