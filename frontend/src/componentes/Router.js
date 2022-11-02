import Booking from "./Booking";
import BookingSucced from "./BookingSucced";

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Booking} />
                    <Route exact path="/BookingSucced" component={BookingSucced} />
                </Switch>
            </BrowserRouter>
        )
    }
}