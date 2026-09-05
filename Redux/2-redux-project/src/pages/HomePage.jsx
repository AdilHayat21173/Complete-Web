import SearchBar from "../Components/SearchBox";
import Tabs from "../components/Tabs";
import ResultGrid from "../components/ResultGrid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
    const { query } = useSelector((store) => store.search);

    return (
        <div>           
            <SearchBar />

            {query != "" ? (
                <div>
                    <Tabs />
                    <ResultGrid />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default HomePage;