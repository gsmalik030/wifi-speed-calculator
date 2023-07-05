module Api
    module V1
        class PlacesController < ApplicationController
            def index
               places = Place.all.map do |place|
                    {
                        name: place.name,
                        city: place.city,
                        most_recent_speed: most_recent_speed(place),
                        speed_unit: speed_unit(place),
                        number_of_test: number_of_test(place),
                        avg_speed: avg_speed(place)
                    }
                end
                render(json: {places: places})
            end
    
    
            def most_recent_speed(place)
                place.wifi_speeds.order("created_at").last.download_speed
            end
    
            def speed_unit(place)
                place.wifi_speeds.order("created_at").last.download_units
            end
    
           def number_of_test(place)
            place.wifi_speeds.count
           end
    
           def avg_speed(place)
            total_speed = place.wifi_speeds.sum(:download_speed)
            number_of_test = number_of_test(place)
            return 0 if number_of_test.zero?
            avg_speed = total_speed / number_of_test
            avg_speed
           end
    
         end
    end
end
