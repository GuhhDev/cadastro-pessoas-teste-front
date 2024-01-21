import {getAPIClient} from "@/core/axios";

class Service {
    protected static http = getAPIClient();
}

export default Service;