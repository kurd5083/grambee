import gift from "@/assets/icons/gift.svg";
import like from "@/assets/icons/like.svg";
import ImgIcon from "@/icons/ImgIcon";
import StarIcon from "@/icons/StarIcon";

export const fiterList = [
  { code: 'gift', name: ' С наличием подарков', price: 0.5, icon: <img src={gift} alt="gift"/> },
  { code: 'star', name: 'Только с премиумом', price: 0.5, icon: <StarIcon width={16} height={16} colorFirst="#579AFF" colorSecond="#236EDE" uniqueId="first"/> },
  { code: 'like', name: 'Взрослые (18+)', price: 1, icon: <img src={like} alt="like"/> },
  { code: 'img', name: 'Фотография в профиле', price: 0.5, icon: <ImgIcon width={16} height={16} color="#56C4FF" /> },
]