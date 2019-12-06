import A from "../../../../../../../js/production/a.js";

export default function Minicart({cartUrl, checkoutUrl}) {
    const currency = ReactRedux.useSelector(state => _.get(state, 'appState.currency', 'USD'));
    const language = ReactRedux.useSelector(state => _.get(state, 'appState.language[0]', 'en'));
    const items = ReactRedux.useSelector(state => _.get(state, 'appState.cart.items'));
    const subTotal = new Intl.NumberFormat(language, { style: 'currency', currency: currency }).format(ReactRedux.useSelector(state => _.get(state, 'appState.cart.subTotal')));

    const onClick = (e) => {
        e.preventDefault();
        setStatus(!status)
    };

    return <div className="uk-inline">
        <a onClick={(e) => onClick(e)}><span uk-icon="cart"></span><span>({items.length})</span></a>
        <div className="mini-cart-content" uk-dropdown="mode: click;pos: bottom-left">
            <div className="">
                {
                    items.map((item, index) => {
                        const _price = new Intl.NumberFormat(language, { style: 'currency', currency: currency }).format(item.final_price);
                        return <div key={index} className="uk-grid uk-grid-small">
                            <div className="uk-width-3-4">
                                <A url={item.url}><span>{item.product_name}</span></A>
                                <div>{item.qty} x {_price}</div>
                            </div>
                            <div className="uk-width-1-4">x</div>
                        </div>
                    })
                }
                <div>
                    <div className="uk-align-right">
                        <span>Total: </span>
                        <span>{subTotal}</span>
                    </div>
                </div>
            </div>
            <A className="uk-button uk-button-small uk-button-primary" url={cartUrl}><span>Checkout</span></A>
            <A className="uk-button uk-button-small uk-button-primary uk-margin-small-left" url={checkoutUrl}><span>Shopping cart</span></A>
        </div>
    </div>
}