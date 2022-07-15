import { Note as INote } from '../../interfaces/Note';

interface IProps {
  note: INote;
}

const Note: React.FC<IProps> = ({ note }) => {
  return <div>Note</div>;
};

export default Note;
