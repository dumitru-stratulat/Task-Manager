import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { AgendaInterface } from './interfaces';
import Notebook from '../../../assets/Notebook.png';
import tag from '../../../assets/tag.png'
import PlusDropdown from '../../Header/PlusDropdown/PlusDropdown';
import './Agenda.css';
import './TagDropdown/Tag.css'
import TagDropdown from './TagDropdown/TagDropdown';

const deleteTag = () => {

}

const Agenda: React.FC<{ agenda: AgendaInterface; style?: string }> = ({ agenda, style }) => {
    const [tagDropDownIsOpen, setTagDropDownIsOpen] = useState(false)
    const agendaContentTextArea = useRef<HTMLTextAreaElement>(null)

    return (
        <div className='agendaContainer'>
            <div className='agendaWrap changeColor'>
                <img src={Notebook} className={`notebook ${style}`} />
                <div>
                    <h4>{agenda.title.charAt(0).toUpperCase()}.</h4>
                    <div className="agendaTitleWrap" >
                        <Link to={`/agenda/${agenda.id}`}>
                            <p>{agenda.title}</p>
                        </Link>
                        <div className="tagsWrap" >
                            {agenda.tags.map((tag: any) =>
                                <div className="agendaTag">
                                    {tag.title}
                                    <button>X</button>
                                </div>)}
                        </div>
                    </div>
                    <p className="agendaInfo">
                        Last modified by:{agenda.user} at {agenda.last_update}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Agenda;
