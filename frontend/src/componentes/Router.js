import Booking from "./Booking";


export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Booking} />
                </Switch>
            </BrowserRouter>
        )
    }
}