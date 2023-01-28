import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import StoreIcon from "@mui/icons-material/Store";
import DescriptionIcon from "@mui/icons-material/Description";

export const dataCardGerai = [
  {
    icon: faGasPump,
    produk: "Pertalite",
    stok: 50600,
  },
  {
    icon: faGasPump,
    produk: "Pertamax",
    stok: 50600,
  },
  {
    icon: faGasPump,
    produk: "Dexlite",
    stok: 50600,
  },
];

export const SidebarItem = [
  { icon: ViewQuiltIcon, title: "Dashboard", span: "", url: "/dashboard" },
  { icon: StoreIcon, title: "Gerai SPBU", span: "", url: "/spbu" },
  // { icon: InventoryIcon, title: "Stok", span: "", url: "/stok" },
  { icon: NoteAltIcon, title: "Laporan", span: "", url: "/laporan" },
  { icon: SupervisedUserCircleIcon, title: "User", span: "", url: "/user" },
  { icon: DescriptionIcon, title: "Form Invoice", span: "", url: "/invoice" },
];

export const RegulerAdminSidebarItem = [
  { icon: ViewQuiltIcon, title: "Dashboard", span: "", url: "/dashboard" },
  // { icon: StoreIcon, title: "Gerai SPBU", span: "", url: "/gerai" },
  // { icon: InventoryIcon, title: "Stok", span: "", url: "/stok" },
  // { icon: NoteAltIcon, title: "Laporan", span: "2", url: "laporan" },
  // { icon: SupervisedUserCircleIcon, title: "User", span: "", url: "/user" },
  { icon: DescriptionIcon, title: "Form Invoice", span: "", url: "/invoice" },
]