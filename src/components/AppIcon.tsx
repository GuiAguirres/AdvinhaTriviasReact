import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function configureIcons() {
	library.add(faCheckSquare, faCoffee, faTrash)
}

type IconProps = {
	className: string
	onClick?: (() => void)
  };

export class AppIcon {

	static TrashCan: React.FC<IconProps> = ({ className, onClick }) => {
		return (
			<FontAwesomeIcon className={className} onClick={onClick} icon={"trash"} style={{color: "red", cursor: onClick != null ? 'pointer' : 'default'}}/>
		)
	}

}