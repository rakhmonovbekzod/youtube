import React, { ReactElement } from "react";

type VideoCardType = {
    video_id: string;
    video_title: string;
    video_description: string;
    video_url: string;
    video_thumbnail_url: string;
    className: string
}

const VideoCard: React.FC<VideoCardType> = (props): ReactElement => {
    return (
        <>
            <div className={`video_card ${props.className}`}>
                <div className="info">
                    <h2>{props.video_title}</h2>
                    <p>{props.video_description}</p>
                </div>
                <div className="gallery">
                    <a href={props.video_url} target="_blank" rel="noopener noreferrer">
                        <img src={props.video_thumbnail_url} alt={props.video_title} />
                    </a>
                    <a href={props.video_url}>
                        <video width="320" height="240" controls>
                            <source src={props.video_url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </a>
                </div>
            </div>
        </>
    )
}

export default VideoCard;