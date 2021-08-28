import { Vue } from "vue-property-decorator";
export default class Hexagon extends Vue {
    private borderSize;
    private borderColor;
    private size;
    private backgroundColor;
    private backgroundImage;
    private contentStyle;
    private contentClass;
    get wrapperStyle(): object;
    get contentStyles(): object;
    get borderStyles(): object;
    mounted(): void;
}
