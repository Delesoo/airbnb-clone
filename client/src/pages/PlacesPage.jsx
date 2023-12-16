import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from 'axios';

export default function PlacesPage() {
    const {action} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [photoLink,setPhotoLink] = useState('');
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    function inputHeader(text) {
      return (
      <h2 className="text-2xl mt-4">{text}</h2>
      );
    }
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }
    function preInput(header,description) {
        return (
            <>
            {inputHeader(header)}
            {inputDescription(description)}
            </>
        );
    }
    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link: photoLink});
        setAddedPhotos(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }
    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                <Link className='inline-flex  gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
    Add new place
</Link>
            </div>
            )}
            {action === 'new' && (
               <div>
                <form>
                    {preInput('Title', 'Title for your place, should be catchy')}
                    <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt" />
                    {preInput('Address', 'Address to this place')}
                    <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
                    {preInput ('Photos', 'More = Better')}
                    <div className="flex gap-2">
                        <input  type="text" 
                                value={photoLink} 
                                onChange={ev => setPhotoLink(ev.target.value)} 
                                placeholder={'Add using a link ...jpg'} />
                        <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
                    </div>
                    <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {addedPhotos.length > 0 && addedPhotos.map(link => (
                            <div>
                               <img className='rounded-2xl' src={"http://localhost:4000/uploads/"+link} alt="" />
                            </div> 
                        ))}
                        <button className="flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
</svg>
    Upload
</button>
                    </div>
                    {preInput('Description', 'Description of the place')}
                    <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                    {preInput('Perks', 'Select all the perks of your place')}                  
                    <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                        <Perks selected={perks} onChange={setPerks} />
                    </div>
                    {preInput('Extra Info', 'House rules, etc.')}    
                    <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                    {preInput('Check in&out times, max guests', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
                    <div className="grid gap-2 sm:grid-cols-3">
                        <div>
                            <h3 className="mt-2 -mb-1">Check in time</h3>
                            <input  type="text" 
                                    value={checkIn} 
                                    onChange={ev => setCheckIn(ev.target.value)} 
                                    placeholder="14:00" />
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Check out time</h3>
                            <input  type="text" 
                                    value={checkOut} 
                                    onChange={ev => setCheckOut(ev.target.value)} 
                                    placeholder="11:00" />
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Max number of guests</h3>
                            <input  type="text" 
                                    value={maxGuests} 
                                    onChange={ev => setMaxGuests(ev.target.value)} />
                        </div>
                    </div>
                        <button className="primary my-4">Save</button>
                </form>
               </div>
            )}
        </div>
    );
}