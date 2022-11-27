import React from 'react';
import { useParams } from 'react-router-dom';
import { PHOTO_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import Head from '../Helper/Head';
import Loading from '../Helper/Loading';
import PhotoContent from '../Photo/PhotoContent';

const Photo = () => {
  const { id } = useParams();
  const { request, error, loading, data } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(id);
    request(url, options);
  }, [id, request]);

  if (error) return <Error />;
  if (loading) return <Loading />;
  if (data)
    return (
      <section className="container containerMain">
        <Head title={data.photo.title} />
        <PhotoContent data={data} single={true} />
      </section>
    );
};

export default Photo;
