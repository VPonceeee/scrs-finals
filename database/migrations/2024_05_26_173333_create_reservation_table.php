<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservation', function (Blueprint $table) {
            $table->id('ReservationId');
            $table->string('Fullname');
            $table->string('MobileNo');
            $table->string('Email');
            $table->date('StartDate');  
            $table->date('EndDate');
            $table->integer('KidsQty');
            $table->integer('AdultsQty');
            $table->integer('SeniorsQty');
            $table->string('Events');
            $table->string('Services');
            $table->string('CateringFoods');
            $table->integer('GuestSubtotal');
            $table->integer('SESubtotal');
            $table->integer('Discount');
            $table->integer('Total');
            $table->string('Status');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservation');
    }
};
