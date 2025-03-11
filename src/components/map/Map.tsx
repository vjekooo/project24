import { createEffect, onCleanup, onMount } from 'solid-js'

interface Props {
  address: string
}

export const Map = ({ address }: Props) => {
  let map: null
  let geocoder: null

  onMount(async () => {
    // @ts-ignore
    if (!window.google) {
      console.error('Google Maps API not loaded')
      return
    }
    // @ts-ignore
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -33.397, lng: 150.644 },
      zoom: 8,
    })
    // @ts-ignore
    geocoder = new google.maps.Geocoder()
  })

  onCleanup(async () => {
    console.log('CLEANING UP!')
  })

  const createMarkerFromAddress = (address: string) => {
    if (!geocoder) return
    // @ts-ignore
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location
        // @ts-ignore
        map?.setCenter(location) // Center map on the found location

        // @ts-ignore
        new google.maps.Marker({
          position: location,
          map: map,
          title: address,
        })
      } else {
        console.error('Geocode error:', status)
      }
    })
  }

  createEffect(() => {
    if (address) {
      createMarkerFromAddress(address)
    }
  }, [address])

  // newMarkers.push(
  //   new google.maps.Marker({
  //     map: map,
  //     position: { lat: -34.397 + addToLat, lng: 150.644 },
  //   })
  // )

  return (
    <>
      <div
        id="map"
        ref={map as unknown as HTMLDivElement}
        style={{
          height: '500px',
          width: '100%',
        }}
      ></div>
    </>
  )
}
